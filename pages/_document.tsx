import * as React from 'react';
import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
    DocumentInitialProps,
  } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../utils/createEmotionCache';

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        const originalRenderPage = ctx.renderPage

        const cache = createEmotionCache();
        const { extractCriticalToChunks } = createEmotionServer(cache);

        /* eslint-disable */
        ctx.renderPage = () =>
            originalRenderPage({
            enhanceApp: (App: any) => (props) =>
                <App emotionCache={cache} {...props} />,
            });
        /* eslint-enable */

        const initialProps = await Document.getInitialProps(ctx);
        // This is important. It prevents emotion to render invalid HTML.
        // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
        const emotionStyles = extractCriticalToChunks(initialProps.html);
        const emotionStyleTags = emotionStyles.styles.map((style) => (
            <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: style.css }}
            />
        )); 
     
        return {
            ...initialProps,
            // Styles fragment is rendered after the app and page rendering finish.
            styles: [
              ...React.Children.toArray(initialProps.styles),
              ...emotionStyleTags,
            ],
          };
      }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}