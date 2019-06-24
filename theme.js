const COLOR = {
    KINOVAR: '#cc0803',
    KINOVAR_MUTED: '#cc080370',
    WIDE: '#379260',
    WIDE_MUTED: '#37926070',
    BUKVITSA: '#3760a2',
    BUKVITSA_MUTED: '#3760a270',
    PAGEBREAK_NUMBER: '#00ffa2',
    PAGEBREAK_LABEL: '#ffffa2',
    PAGEBREAK_DELIM: '#00ffa270',
};

const theme = [
    {
        scope: 'markup.kinovar',
        settings: { foreground: COLOR.KINOVAR }
    },
    {
        scope: 'markup.kinovar.delim',
        settings: { foreground: COLOR.KINOVAR_MUTED }
    },
    {
        scope: 'markup.wide',
        settings: { foreground: COLOR.WIDE }
    },
    {
        scope: 'markup.wide.delim',
        settings: { foreground: COLOR.WIDE_MUTED }
    },
    {
        scope: 'markup.bukvitsa',
        settings: { foreground: COLOR.BUKVITSA }
    },
    {
        scope: 'markup.bukvitsa.delim',
        settings: { foreground: COLOR.BUKVITSA_MUTED }
    },
    {
        scope: 'markup.pagebreak.number',
        settings: { foreground: COLOR.PAGEBREAK_NUMBER }
    },
    {
        scope: 'markup.pagebreak.label',
        settings: { foreground: COLOR.PAGEBREAK_LABEL }
    },
    {
        scope: 'markup.pagebreak.delim',
        settings: { foreground: COLOR.PAGEBREAK_DELIM }
    },
];

exports.theme = theme ;