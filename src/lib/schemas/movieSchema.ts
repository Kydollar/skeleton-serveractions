import z from 'zod';

import { titleMovieRefinement } from '../refinements/movieRefinement';

export const tagSchema = z.object({
    name: z.string().min(1, 'Tag name is required').max(50),
    slug: z.string(),
});

export const categorySchema = z.object({
    name: z.string().min(1, 'Category is required').max(50),
    slug: z.string(),
});

export const movieSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    releaseDate: z.date().refine((date) => !!date, {
        message: 'Release Date is required',
    }),
    imageUrl: z.string().min(1, 'Image URL is required'),
    published: z.boolean(),
    category: categorySchema,
    tags: tagSchema.array(),
});

export const movieFormSchema = movieSchema
    .extend({
        slug: z.string().optional(),
        tags: z.array(z.string()).min(1, 'At least one tag is required'),
        category: z.string().min(1, 'Category is required'),
    })
    .refine(titleMovieRefinement, {
        message: 'Title is already in use',
        path: ['title'],
    });

export type TMovie = z.infer<typeof movieSchema>;
export type TMovieForm = z.infer<typeof movieFormSchema>;
export type TTag = z.infer<typeof tagSchema>;
export type TCategory = z.infer<typeof categorySchema>;
