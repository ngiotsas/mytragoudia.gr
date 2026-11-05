import { HtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addPassthroughCopy("src/assets");

  // Single line breaks inside a verse stay as line breaks.
  eleventyConfig.amendLibrary("md", (md) => md.set({ breaks: true }));

  eleventyConfig.addShortcode("year", () => String(new Date().getFullYear()));
  eleventyConfig.addFilter("pad2", (n) => String(n).padStart(2, "0"));
  eleventyConfig.addFilter("isActive", (itemUrl, pageUrl) =>
    itemUrl === "/" ? pageUrl === "/" : String(pageUrl).startsWith(itemUrl)
  );

  // Decorative waveform under the home page hero.
  eleventyConfig.addShortcode("wave", (n = 96) => {
    let bars = "";
    for (let i = 0; i < n; i++) {
      let h = 8 + 44 * Math.abs(Math.sin(i * 0.37) * 0.6 + Math.sin(i * 0.11 + 1) * 0.4) * (0.55 + 0.45 * Math.abs(Math.sin(i * 0.05)));
      h = Math.round(Math.min(h, 56) * 10) / 10;
      bars += `<rect x="${i * 6}" y="${Math.round((30 - h / 2) * 10) / 10}" width="3.5" height="${h}" rx="1.75"/>`;
    }
    return `<svg class="wave" viewBox="0 0 ${n * 6} 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">${bars}</svg>`;
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
