# Add Windows Defender exclusion for Webknot workspace
# Run this script as Administrator

$workspacePath = "F:\Webknot"

Write-Host "Adding Windows Defender exclusion for: $workspacePath" -ForegroundColor Cyan

try {
    Add-MpPreference -ExclusionPath $workspacePath
    Write-Host "✓ Successfully added exclusion" -ForegroundColor Green
    
    # Verify it was added
    $exclusions = (Get-MpPreference).ExclusionPath
    if ($exclusions -contains $workspacePath) {
        Write-Host "✓ Verified: Exclusion is active" -ForegroundColor Green
    } else {
        Write-Host "⚠ Warning: Could not verify exclusion" -ForegroundColor Yellow
    }
} catch {
    Write-Host "✗ Failed to add exclusion: $_" -ForegroundColor Red
    exit 1
}

Write-Host "`nCurrent exclusions:" -ForegroundColor Cyan
(Get-MpPreference).ExclusionPath | ForEach-Object { Write-Host "  - $_" }
