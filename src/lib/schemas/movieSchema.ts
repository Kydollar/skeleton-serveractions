import z from 'zod';

import { titleMovieRefinement } from '../refinements/movieRefinement';

export const tagSchema = z.object({
    name: z.string().min(1, 'Tag name is required').max(50),
    slug: z.string(),
});

export const categorySchema = z.object({
    name: z.string().min(1, 'Category name is required').max(50),
    slug: z.string(),
});

export const movieSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    releaseDate: z.date().optional(),
    imageUrl: z.string().optional(),
    published: z.boolean(),
    category: categorySchema,
    tags: tagSchema.array(),
});

export const movieFormSchema = movieSchema
    .extend({
        slug: z.string().optional(),
        tags: z.array(z.string()).min(1, 'At least one tag is required'),
    })
    .refine(titleMovieRefinement, {
        message: 'Title is already in use',
        path: ['title'],
    });

export type TMovie = z.infer<typeof movieSchema>;
export type TMovieForm = z.infer<typeof movieFormSchema>;
