import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				// Q&A ページの由来となった GitHub Issue 番号
				issue: z.number().optional(),
			}),
		}),
	}),
	// UI 文字列の上書き（Starlight に日本語訳がない検索 UI の文言など）
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
