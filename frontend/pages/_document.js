import Document, { Html, Head, NextScript, Main } from 'next/document';

export default class MyDocumnet extends Document {
  render() {
    return (
      <Html lang="en-IN">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
