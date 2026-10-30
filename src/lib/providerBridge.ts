import path from "path";
import fs from "fs";
import axios from "axios";
import * as cheerio from "cheerio";

// Safely obtain native Node.js require without Turbopack/Webpack bundle-time evaluation
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nativeRequire: (id: string) => any = (() => {
  try {
    return eval("require");
  } catch {
    return require;
  }
})();

// Initialize global provider context
const providerContext = {
  axios,
  cheerio,
  commonHeaders: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  },
  Aes: {},
};

const providersDistPath = path.join(process.cwd(), "src", "providers-dist");

export interface MoviePost {
  title: string;
  link: string;
  image: string;
  provider?: string;
}

export interface MovieMeta {
  title?: string;
  synopsis?: string;
  image?: string;
  imdbId?: string;
  type?: string;
  rating?: string | number;
  duration?: string;
  releaseDate?: string;
  cast?: string[];
  genre?: string[];
  linkList?: Array<{
    title: string;
    directLinks?: Array<{ title?: string; link: string }>;
    episodesLink?: string;
    quality?: string;
    size?: string;
  }>;
  episodes?: Array<{
    title: string;
    episodeNumber?: number;
    link: string;
  }>;
}

export interface StreamSource {
  server?: string;
  link: string;
  type?: string;
  quality?: string;
  subtitles?: Array<{
    language: string;
    url: string;
  }>;
}

export function getProvidersList() {
  try {
    const manifestPath = path.join(providersDistPath, "manifest.json");
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
      return manifest;
    }
  } catch (e) {
    console.error("Error reading manifest:", e);
  }
  return [];
}

export async function fetchPosts(
  provider = "valorafilm",
  filter = "",
  page = 1
): Promise<MoviePost[]> {
  try {
    const postsModulePath = path.join(providersDistPath, provider, "posts.js");
    if (!fs.existsSync(postsModulePath)) {
      throw new Error(`Provider posts module not found: ${provider}`);
    }

    const module = nativeRequire(postsModulePath);
    if (!module || typeof module.getPosts !== "function") {
      throw new Error(`getPosts is not a function in provider: ${provider}`);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const posts = await module.getPosts({
      filter,
      page,
      providerValue: provider,
      signal: controller.signal,
      providerContext,
    });

    clearTimeout(timeout);
    return Array.isArray(posts) ? posts.map((p: MoviePost) => ({ ...p, provider })) : [];
  } catch (err: unknown) {
    const error = err as Error;
    console.error(`Error in fetchPosts (${provider}):`, error.message);
    return [];
  }
}

export async function searchMovies(
  query: string,
  provider = "valorafilm",
  page = 1
): Promise<MoviePost[]> {
  try {
    const postsModulePath = path.join(providersDistPath, provider, "posts.js");
    if (!fs.existsSync(postsModulePath)) {
      throw new Error(`Provider posts module not found: ${provider}`);
    }

    const module = nativeRequire(postsModulePath);
    if (!module || typeof module.getSearchPosts !== "function") {
      throw new Error(`getSearchPosts is not a function in provider: ${provider}`);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const posts = await module.getSearchPosts({
      searchQuery: query,
      page,
      providerValue: provider,
      signal: controller.signal,
      providerContext,
    });

    clearTimeout(timeout);
    return Array.isArray(posts) ? posts.map((p: MoviePost) => ({ ...p, provider })) : [];
  } catch (err: unknown) {
    const error = err as Error;
    console.error(`Error in searchMovies (${provider}):`, error.message);
    return [];
  }
}

export async function fetchMeta(
  link: string,
  provider = "valorafilm"
): Promise<MovieMeta | null> {
  try {
    const metaModulePath = path.join(providersDistPath, provider, "meta.js");
    if (!fs.existsSync(metaModulePath)) {
      throw new Error(`Provider meta module not found: ${provider}`);
    }

    const module = nativeRequire(metaModulePath);
    if (!module || typeof module.getMeta !== "function") {
      throw new Error(`getMeta is not a function in provider: ${provider}`);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const meta = await module.getMeta({
      link,
      providerValue: provider,
      signal: controller.signal,
      providerContext,
    });

    clearTimeout(timeout);
    return meta;
  } catch (err: unknown) {
    const error = err as Error;
    console.error(`Error in fetchMeta (${provider}):`, error.message);
    return null;
  }
}

export async function fetchEpisodes(
  url: string,
  provider = "valorafilm"
) {
  try {
    const epModulePath = path.join(providersDistPath, provider, "episodes.js");
    if (!fs.existsSync(epModulePath)) {
      return [];
    }

    const module = nativeRequire(epModulePath);
    if (!module || typeof module.getEpisodes !== "function") {
      return [];
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const episodes = await module.getEpisodes({
      url,
      providerValue: provider,
      signal: controller.signal,
      providerContext,
    });

    clearTimeout(timeout);
    return episodes || [];
  } catch (err: unknown) {
    const error = err as Error;
    console.error(`Error in fetchEpisodes (${provider}):`, error.message);
    return [];
  }
}

export async function fetchStream(
  link: string,
  type = "movie",
  provider = "valorafilm"
) {
  try {
    const streamModulePath = path.join(providersDistPath, provider, "stream.js");
    if (!fs.existsSync(streamModulePath)) {
      throw new Error(`Provider stream module not found: ${provider}`);
    }

    const module = nativeRequire(streamModulePath);
    if (!module || typeof module.getStream !== "function") {
      throw new Error(`getStream is not a function in provider: ${provider}`);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    const stream = await module.getStream({
      link,
      type,
      providerValue: provider,
      signal: controller.signal,
      providerContext,
    });

    clearTimeout(timeout);
    return stream;
  } catch (err: unknown) {
    const error = err as Error;
    console.error(`Error in fetchStream (${provider}):`, error.message);
    return null;
  }
}
