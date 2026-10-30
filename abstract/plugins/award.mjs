/**
 * `award` directive: a celebratory callout for a prize or recognition.
 *
 *   :::{award} Best Student Presentation
 *   :recipient: Johnathan Kuttai
 *   :event: AEM 2026, 9th International Airborne Electromagnetics Workshop
 *   Optional extra text, in MyST.
 *   :::
 *
 * Site render plugins load in the browser, after the page has rendered. Until then the theme
 * draws an unknown node by printing its `children`, so the body lives on `content` instead:
 * the page shows nothing until the renderer arrives, and the renderer animates the award in.
 */
const awardDirective = {
  name: 'award',
  doc: 'A celebratory callout for an award or recognition.',
  arg: { type: String, doc: 'The name of the award.' },
  options: {
    recipient: { type: String, doc: 'Who received it.' },
    event: { type: String, doc: 'Where or when it was awarded.' },
  },
  body: { type: 'myst', doc: 'Optional extra text.' },
  run(data) {
    return [
      {
        type: 'award',
        title: typeof data.arg === 'string' ? data.arg : 'Award',
        recipient: data.options?.recipient,
        event: data.options?.event,
        content: data.body ?? [],
      },
    ];
  },
};

const plugin = {
  name: 'Award callout',
  directives: [awardDirective],
  renderers: [
    {
      name: 'Award',
      doc: 'Renders award nodes as a callout in the site colors.',
      source: './award-renderer.mjs',
    },
  ],
};

export default plugin;
