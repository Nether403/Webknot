import { useRef, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Drawer,
  Flex,
  Icon,
  IconButton,
  Image,
  Kbd,
  Portal,
  Select,
  Separator,
  Text,
  Tooltip,
  useDisclosure,
  createListCollection
} from '@chakra-ui/react';

import { FiArrowRight, FiMenu, FiSearch, FiStopCircle } from 'react-icons/fi';
import { RiHeartFill } from 'react-icons/ri';

import { useStars } from '../../hooks/useStars';
import { useSearch } from '../context/SearchContext/useSearch';
import { useOptions } from '../context/OptionsContext/useOptions';

import Logo from '../../assets/logos/react-bits-logo.svg';
import Star from '../../assets/common/star.svg';
import jsIcon from '../../assets/icons/js.svg';
import tsIcon from '../../assets/icons/ts.svg';
import cssIcon from '../../assets/icons/css.svg';
import twIcon from '../../assets/icons/tw.svg';
import FadeContent from '../../content/Animations/FadeContent/FadeContent';

const Header = () => {
  const langCollection = useMemo(() => createListCollection({ items: ['JS', 'TS'] }), []);
  const styleCollection = useMemo(() => createListCollection({ items: ['CSS', 'TW'] }), []);
  const { languagePreset, setLanguagePreset, stylePreset, setStylePreset } = useOptions();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleSearch } = useSearch();
  const stars = useStars();
  const starCountRef = useRef(null);

  const iconMap = {
    JS: jsIcon,
    TS: tsIcon,
    CSS: cssIcon,
    TW: twIcon
  };

  const colorMap = {
    JS: '#F7DF1E',
    TS: '#3178C6',
    CSS: '#7E57C2',
    TW: '#38BDF8'
  };

  const LanguageSelect = (
    <Select.Root
      collection={langCollection}
      value={[languagePreset]}
      onValueChange={({ value }) => setLanguagePreset(value[0])}
      size="sm"
      width="70px"
      closeOnSelect={false}
    >
      <Select.HiddenSelect name="language" />

      <Select.Control>
        <Select.Trigger
          fontSize="14px"
          bg="#060010"
          border="1px solid #271E37"
          rounded="full"
          h={10}
          fontWeight={600}
          cursor="pointer"
          transition="background 0.3s"
          _hover={{ background: '#170D27' }}
        >
          <Select.ValueText color="#fff" pl={1} fontSize="14px">
            {languagePreset && <Image src={iconMap[languagePreset]} alt={languagePreset} boxSize={5} />}
          </Select.ValueText>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>

      <Portal>
        <Select.Positioner>
          <Select.Content
            bg="#060010"
            border="1px solid #271E37"
            borderRadius="15px"
            w="70px"
            px={2}
            py={2}
            zIndex="modal"
          >
            {langCollection.items.map(lang => (
              <Select.Item
                item={lang}
                key={lang}
                borderRadius="8px"
                px={2}
                py={2}
                cursor="pointer"
                display="flex"
                alignItems="center"
                gap={2}
                _highlighted={{ bg: '#271E37' }}
              >
                <Image src={iconMap[lang]} alt={lang} boxSize={5} />
                <Select.ItemIndicator display="flex" alignItems="center" mr="3px">
                  <Box boxSize={2} bg={colorMap[lang]} borderRadius="full" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );

  const StyleSelect = (
    <Select.Root
      collection={styleCollection}
      closeOnSelect={false}
      value={[stylePreset]}
      onValueChange={({ value }) => setStylePreset(value[0])}
      size="sm"
      width="70px"
    >
      <Select.HiddenSelect name="style" />
      <Select.Control>
        <Select.Trigger
          fontSize="12px"
          bg="#060010"
          border="1px solid #271E37"
          rounded="full"
          h={10}
          fontWeight={600}
          cursor="pointer"
          transition="background 0.3s"
          _hover={{ background: '#170D27' }}
        >
          <Select.ValueText color="#fff" pl={1} fontSize="14px">
            {stylePreset && <Image src={iconMap[stylePreset]} alt={stylePreset} boxSize={5} />}
          </Select.ValueText>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content
            bg="#060010"
            border="1px solid #271E37"
            borderRadius="15px"
            w="70px"
            px={2}
            py={2}
            zIndex="modal"
          >
            {styleCollection.items.map(style => (
              <Select.Item
                item={style}
                key={style}
                borderRadius="8px"
                px={2}
                py={2}
                cursor="pointer"
                display="flex"
                alignItems="center"
                gap={2}
                _highlighted={{ bg: '#271E37' }}
              >
                <Image src={iconMap[style]} alt={style} boxSize={5} />
                <Select.ItemIndicator display="flex" alignItems="center" mr="3px">
                  <Box boxSize={2} bg={colorMap[style]} borderRadius="full" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );

  return (
    <Box zIndex={100} className="main-nav">
      <Flex className="nav-items" h={20} alignItems="center" justifyContent="space-between" px={4}>
        <RouterLink to="/" className="logo">
          <Image src={Logo} alt="Logo" className="cursor-target" />
        </RouterLink>

        <IconButton
          aria-label="Open Menu"
          icon={<FiMenu size="1.3em" />}
          size="md"
          display={{ md: 'none' }}
          onClick={onOpen}
        />

        <Flex display={{ base: 'none', md: 'flex' }} alignItems="center" gap={2}>
          <FadeContent blur>
            <Flex
              as="button"
              fontSize="12px"
              h={10}
              pr={2}
              pl={3}
              rounded="full"
              bg="#060010"
              border="1px solid #271E37"
              fontWeight={600}
              align="center"
              gap={1}
              cursor="text"
              userSelect="none"
              transition="background 0.3s"
              _hover={{ background: '#170D27' }}
              onClick={toggleSearch}
            >
              <Icon as={FiSearch} boxSize={4} color="#392e4e" />
              <Text mr={8} color="#a6a6a6">
                Search Docs
              </Text>
              <Kbd
                color="#B19EEF"
                fontSize="10px"
                borderColor="#271E37"
                borderRadius="50px"
                width="20px"
                height="20px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                backgroundColor="#170D27"
                fontWeight={800}
              >
                /
              </Kbd>
            </Flex>
          </FadeContent>

          <FadeContent blur>{LanguageSelect}</FadeContent>
          <FadeContent blur>{StyleSelect}</FadeContent>

          <Tooltip.Root openDelay={150} closeDelay={100} positioning={{ placement: 'bottom', gutter: 8 }}>
            <FadeContent blur>
              <Tooltip.Trigger asChild>
                <IconButton
                  as={RouterLink}
                  to="/favorites"
                  aria-label="Favorites"
                  color="#fff"
                  variant="solid"
                  borderRadius="full"
                  border="none"
                  minW={10}
                  h={10}
                  transition="filter 0.2s"
                  bg="linear-gradient(-135deg, rgba(124, 58, 237, 1), rgba(75, 58, 255, 0.6))"
                  _hover={{ filter: 'brightness(1.1)', transition: 'filter 0.2s' }}
                  _active={{ filter: 'brightness(0.95)', transition: 'filter 0.2s' }}
                >
                  <Icon as={RiHeartFill} color="#fff" boxSize={4} />
                </IconButton>
              </Tooltip.Trigger>
              <Tooltip.Positioner>
                <Tooltip.Content
                  bg="#060010"
                  border="1px solid #271e37"
                  color="#fff"
                  fontSize="12px"
                  fontWeight="600"
                  px={4}
                  whiteSpace="nowrap"
                  py={2}
                  borderRadius="50px"
                  textAlign="center"
                  pointerEvents="none"
                >
                  Favorites
                </Tooltip.Content>
              </Tooltip.Positioner>
            </FadeContent>
          </Tooltip.Root>

          <FadeContent blur>
            <button
              className="cta-button-docs"
              onClick={() => window.open('https://github.com/DavidHDev/react-bits', '_blank')}
            >
              Star On GitHub
              <span ref={starCountRef}>
                <img src={Star} alt="Star Icon" />
                {stars}
              </span>
            </button>
          </FadeContent>
        </Flex>
      </Flex>

      <Drawer.Root placement="top" open={isOpen} onOpenChange={v => (v ? onOpen() : onClose())}>
        <Drawer.Backdrop display={{ md: 'none' }}>
          <Drawer.Content bg="black" h="100%">
            <Drawer.Body p={0}>
              <Flex direction="column">
                <Flex align="center" justify="space-between" h="57px" px={6} mb={6} borderBottom="1px solid #ffffff1c">
                  <Image src={Logo} alt="Logo" h="25px" />
                  <IconButton
                    aria-label="Close Menu"
                    icon={<Icon as={FiStopCircle} boxSize={4} />}
                    size="md"
                    display={{ md: 'none' }}
                    onClick={onClose}
                  />
                </Flex>

                <Flex direction="column" px={6} gap={2}>
                  <Text fontWeight="bold">Useful Links</Text>
                  <RouterLink to="/get-started/introduction" onClick={onClose}>
                    Docs
                  </RouterLink>
                  <RouterLink to="https://github.com/DavidHDev/react-bits" target="_blank" onClick={onClose}>
                    GitHub <Icon as={FiArrowRight} transform="rotate(-45deg)" ml={1} />
                  </RouterLink>

                  <RouterLink to="/favorites" onClick={onClose}>
                    Favorites
                  </RouterLink>

                  <Separator my={4} />

                  <Text fontWeight="bold">Other</Text>
                  <RouterLink to="https://x.com/davidhdev" target="_blank" onClick={onClose}>
                    Who made this?
                    <Icon as={FiArrowRight} transform="rotate(-45deg)" ml={1} />
                  </RouterLink>
                </Flex>
              </Flex>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer.Root>
    </Box>
  );
};

export default Header;
