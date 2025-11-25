# File Write Fallback Strategy

## Problem Statement

Intermittent file write failures occur in approximately 50% of first write attempts in new Kiro sessions, with error message: "Error(s) while editing (filename) aborted."

## Root Cause Analysis

**Primary Cause**: Windows Defender real-time scanning causing temporary file locks
**Secondary Causes**: 
- File system indexing
- Dev server file watchers (esbuild, vite)
- Race conditions during cold starts

## Mitigation Applied

1. ✅ **F: drive excluded from Windows Defender** (2025-11-15)
2. ✅ **SearchIndexer already inactive on F:**
3. ✅ **Automatic PowerShell fallback implemented** (this document)

## Fallback Strategy

When `fsWrite` or `strReplace` fails with file system errors, immediately retry using PowerShell commands instead of stopping execution.

### Implementation Pattern

**For fsWrite failures:**
```typescript
// If fsWrite fails, immediately use:
executePwsh({
  command: `@"
[CONTENT]
"@ | Out-File -FilePath "[PATH]" -Encoding UTF8 -NoNewline`
})
```

**For strReplace failures:**
```typescript
// If strReplace fails, read file, modify in memory, write via PowerShell:
1. executePwsh({ command: `Get-Content "[PATH]" -Raw` })
2. Perform string replacement in memory
3. executePwsh({ command: `@"...[NEW_CONTENT]..."@ | Out-File...` })
```

**For fsAppend failures:**
```typescript
// If fsAppend fails:
executePwsh({
  command: `Add-Content -Path "[PATH]" -Value @"
[CONTENT]
"@ -Encoding UTF8 -NoNewline`
})
```

## Execution Rules

### When to Use Fallback

✅ **DO use fallback immediately when:**
- fsWrite returns error containing "Error(s) while editing"
- strReplace returns "aborted" error
- Any file operation times out or fails

❌ **DON'T use fallback for:**
- Syntax errors in code (fix the code instead)
- Path not found errors (verify path first)
- Permission denied on system files (these should fail)

### Fallback Execution Flow

1. **Attempt standard file operation** (fsWrite, strReplace, etc.)
2. **If error occurs:**
   - Log the error type
   - Immediately execute PowerShell equivalent
   - Continue with task (don't stop execution)
3. **If PowerShell also fails:**
   - Report to user with specific error
   - Ask for guidance

### PowerShell Command Templates

**Write entire file:**
```powershell
@"
[CONTENT HERE]
"@ | Out-File -FilePath "path/to/file.ext" -Encoding UTF8 -NoNewline
```

**Append to file:**
```powershell
Add-Content -Path "path/to/file.ext" -Value @"
[CONTENT HERE]
"@ -Encoding UTF8 -NoNewline
```

**Replace content (multi-step):**
```powershell
# Read
$content = Get-Content "path/to/file.ext" -Raw

# Modify (in Kiro's processing)
# Then write back:
@"
[MODIFIED CONTENT]
"@ | Out-File -FilePath "path/to/file.ext" -Encoding UTF8 -NoNewline
```

## Special Considerations

### Escaping in PowerShell Here-Strings

When using `@"..."@` here-strings:
- **Quotes**: Don't need escaping inside here-strings
- **Dollar signs**: Use `` `$ `` to escape if needed
- **Backticks**: Use ``` `` ``` to escape
- **At signs**: `@` at start of line needs escaping: `` `@ ``

### Path Handling

- Use forward slashes `/` or escaped backslashes `\\`
- Relative paths work from workspace root
- Absolute paths should use full Windows paths

### Encoding

Always use `-Encoding UTF8` to match Kiro's default encoding and prevent BOM issues.

### Line Endings

- Use `-NoNewline` to prevent extra newline at end
- PowerShell uses CRLF by default (Windows standard)
- This matches expected behavior for Windows development

## Monitoring & Logging

When fallback is used, log:
```
[File Write Fallback] fsWrite failed for [filename], retrying via PowerShell
```

This helps track:
- How often fallback is needed
- Whether Defender exclusion is working
- If additional mitigation is needed

## Success Metrics

**Target**: <5% fallback usage after Defender exclusion
**Current baseline**: ~50% failure rate (pre-mitigation)
**Expected after mitigation**: <10% failure rate

If fallback usage remains >10% after Defender exclusion:
1. Check if exclusion is actually active
2. Investigate other file locking processes
3. Consider additional mitigations

## Example Implementation

**Before (stops on error):**
```typescript
fsWrite({ path: "file.ts", text: content })
// Error occurs → execution stops → user must intervene
```

**After (automatic fallback):**
```typescript
try {
  fsWrite({ path: "file.ts", text: content })
} catch (error) {
  console.log("[File Write Fallback] Retrying via PowerShell")
  executePwsh({
    command: `@"
${content}
"@ | Out-File -FilePath "file.ts" -Encoding UTF8 -NoNewline`
  })
}
// Execution continues seamlessly
```

## Testing the Fallback

To verify fallback works:
1. Attempt file write in new session
2. If error occurs, fallback should trigger automatically
3. File should be written successfully via PowerShell
4. No user intervention required

## Future Improvements

If issues persist after current mitigations:
- Add retry logic with exponential backoff
- Implement file lock detection before write attempts
- Add pre-write validation to check file accessibility
- Consider using Windows file system APIs directly

## Related Documentation

- **Defender Exclusion Script**: `add-defender-exclusion.ps1`
- **Issue Discussion**: This was identified on 2025-11-15 after observing 50% failure rate on first writes in new sessions
- **Mitigation Status**: Defender exclusion applied, fallback strategy documented

## Questions?

If file write issues persist after these mitigations:
1. Check if F: drive exclusion is active: `Get-MpPreference | Select-Object -ExpandProperty ExclusionPath`
2. Check for other file locking processes: `Get-Process | Where-Object {$_.Path -like "*Webknot*"}`
3. Report specific error messages for further diagnosis

---

**Last Updated**: 2025-11-15
**Status**: Active mitigation strategy
**Effectiveness**: To be monitored over next sessions
