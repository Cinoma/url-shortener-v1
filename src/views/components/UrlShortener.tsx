import { Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

import axios from "axios";

// TODO: Change this when application has a dedicated backend server.
const baseUrl = "http://localhost:8000";

const UrlShortener: React.FC = () => {
  const [origUrl, setOrigUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${baseUrl}/api/links`, {
        longUrl: origUrl,
        slug,
      });

      // This ensures we use the right base URL whether local or in production
      let respUrl = window.location.origin;
      if (respUrl.startsWith("http://localhost")) {
        respUrl = baseUrl;
      }

      setShortUrl(`${respUrl}/${response.data.slug}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard
        .writeText(shortUrl)
        .then(() => {
          alert("Short URL copied to clipboard!");
        })
        .catch(() => {
          alert("Failed to copy URL.");
        });
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Original URL"
          variant="outlined"
          fullWidth
          value={origUrl}
          onChange={(e) => setOrigUrl(e.target.value)}
          required
        />
        <TextField
          label="Custom Slug (Optional)"
          variant="outlined"
          fullWidth
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          style={{ marginTop: "20px" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Shorten URL
        </Button>
      </form>
      {shortUrl && (
        <>
          <Typography
            variant="body1"
            color="green"
            style={{ marginTop: "20px" }}
          >
            Short URL: {shortUrl}
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCopy}
            style={{ marginTop: "10px" }}
          >
            Copy to Clipboard
          </Button>
        </>
      )}
      {error && (
        <Typography variant="body1" color="error" style={{ marginTop: "20px" }}>
          {error}
        </Typography>
      )}
    </Container>
  );
};

export default UrlShortener;
