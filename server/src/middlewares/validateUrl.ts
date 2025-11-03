import { Request, Response, NextFunction } from 'express';

const validateUrl = (req: Request, res: Response, next: NextFunction) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: 'URL is required' });
  }

  if (typeof url !== 'string') {
    return res.status(400).json({ message: 'URL must be a string' });
  }

  try {
    // Add protocol if missing (e.g., "example.com" -> "https://example.com")
    let urlToValidate = url.trim();
    if (
      !urlToValidate.startsWith('http://') &&
      !urlToValidate.startsWith('https://')
    ) {
      urlToValidate = `https://${urlToValidate}`;
    }

    // Validate URL format using URL constructor
    const urlObj = new URL(urlToValidate);

    // Ensure it's http or https
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return res
        .status(400)
        .json({ message: 'URL must use http or https protocol' });
    }

    // Attach normalized URL to request for use in controller
    req.body.validatedUrl = urlToValidate;

    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid URL format' });
  }
};

export default validateUrl;
