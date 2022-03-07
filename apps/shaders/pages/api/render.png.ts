// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import qs from "querystring";

import chromium from "chrome-aws-lambda";
import { chromium as playwrightChromium } from "playwright-core";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const browser = await playwrightChromium.launch({
    args: chromium.args,
    ...(process.env.NODE_ENV !== "development"
      ? {
          executablePath: await chromium.executablePath,
          headless: chromium.headless,
        }
      : {}),
  });

  const page = await browser.newPage({
    viewport: {
      width: 800,
      height: 418,
    },
  });

  const secure = req.headers.host?.indexOf("localhost") === -1;
  const host = `http${secure ? "s" : ""}://${req.headers.host}`;
  const url = `${host}/screenshot?${qs.stringify(req.query)}`;

  await page.goto(url);

  const base64 = await page.screenshot({
    type: "png",
  });

  await browser.close();

  res.writeHead(200, {
    "Content-Type": "image/png",
    "Cache-Control": "s-maxage=86400, public",
  });
  res.end(base64);
}
