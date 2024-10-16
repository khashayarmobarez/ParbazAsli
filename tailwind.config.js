/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      // overall
      bgPageMain: 'var(--bg-page-main)',
      textAccent: 'var(--text-accent)',
      textDefault: 'var(--text-default)',
      textDefaultOpposite: 'var(--text-default-opposite)',
      textDisabled: 'var(--text-disabled)',
      textError: 'var(--text-error)',

      // main button
      bgButtonMainDefault: 'var(--bg-button-main-default)',
      bgButtonMainHover: 'var(--bg-button-main-hover)',
      bgButtonMainActive: 'var(--bg-button-main-active)',
      textButtonMainDefault: 'var(--text-button-main-default)',
      textButtonMainDisabled: 'var(--text-button-main-disabled)',

      // second button
      bgButtonSecondaryDefault: 'var(--bg-button-secondary-default)',
      bgButtonSecondaryHover: 'var(--bg-button-secondary-hover)',
      bgButtonSecondaryActive: 'var(--bg-button-secondary-active)',
      bgButtonSecondaryDisabled: 'var(--bg-button-secondary-disabled)',

      // button profile
      bgButtonProfileDefault: 'var(--bg-button-profile-default)',
      bgButtonProfileHover: 'var(--bg-button-profile-hover)',
      bgButtonProfileActive: 'var(--bg-button-profile-active)',
      bgButtonProfileDisabled: 'var(--bg-button-profile-disabled)',
      textButtonProfileDefault: 'var(--text-button-profile-default)',
      textButtonProfileDisable: 'var(--text-button-profile-Disable)',
      textButtonProfileActive: 'var(--text-button-profile-active)',

      // input
      bgInputDropdown: 'var(--bg-input-dropdown)',
      bgInputSelectedOption: 'var(--bg-input-selected-option)',
      borderInputSuccess: 'var(--border-input-success)',
      borderInputError: 'var(--border-input-error)',
      borderInputDefault: 'var(--border-input-default)',
      borderInputSelected: 'var(--border-input-selected)',
      textInputDefault: 'var(--text-input-default)',
      textInputSelected: 'var(--text-input-selected)',
      textInputError: 'var(--text-input-error)',
      textInputSuccess: 'var(--text-input-success)',

      // outputs
      bgOutputDefault: 'var(--bg-output-default)',
      bgOutputSelectedOption: 'var(--bg-output-selected-option)',
      borderOutput: 'var(--border-output)',

      // pop ups
      bgPopUpDefault: 'var(--bg-pop-up-default)',
      bgPopUpHeaderFooter: 'var(--bg-pop-up-header-footer)',

      // cards
      bgCard: 'var(--bg-card)',

      //  menu(navbar,footer) 
      bgMenu: 'var(--bg-menu)',

      // tab and header
      bgTabActive: 'var(--bg-tab-active)',
      bgTabHover: 'var(--bg-tab-hover)',
      bgTabDefault: 'var(--bg-tab-default)',
      bgHeader: 'var(--bg-header)',

      // checkbox
      borderCheckbox: 'var(--border-checkbox)',

      // divider
      bgDividerActive: 'var(--bg-divider-active)',
      bgDividerDefault: 'var(--bg-divider-default)',

      // icon
      iconActive: 'var(--icon-active)',
      iconDefault: 'var(--icon-default)',
      iconDisable: 'var(--icon-disable)',

      // shadow
      shadowAll: 'var(--shadow-all)',
      shadowButtonWhite: 'var(--shadow-button-white)',
      shadowButtonDark: 'var(--shadow-button-dark)',

    },
    extend: {},
  },
  plugins: [],
}