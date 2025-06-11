import { marked } from 'marked';

export default defineNuxtPlugin(() => {
  // カスタムレンダラーを作成
  const customRenderer = new marked.Renderer();

  // imageメソッドをオーバーライド
  customRenderer.image = ({ href, title, text }) => {
    // altテキスト（text）が存在する場合
    if (text) {
      return `
        <figure>
          <img src="${href}" alt="${text}" ${title ? `title="${title}"` : ''}>
          <figcaption>${text}</figcaption>
        </figure>
      `;
    } else {
      // altテキストがない場合は通常のimgタグを返す
      return `<img src="${href}" ${title ? `title="${title}"` : ''}>`;
    }
  };

  // Marked.jsにカスタムレンダラーを設定
  marked.use({ renderer: customRenderer });

  return {
    provide: {
      marked: marked
    }
  };
});