import slugify from 'slugify';

import { db } from '@/lib/db';

const existingMovieBySlug = async (title: string): Promise<boolean> => {
    try {
        const slug = slugify(title, { lower: true });

        const movie = await db.movie.findUnique({
            where: {
                slug,
            },
        });

        return Boolean(movie);
    } catch (error) {
        return false;
    }
};

const existingMovieTagByName = async (name: string): Promise<boolean> => {
    try {
        const slug = slugify(name, { lower: true });

        const tag = await db.movieTag.findUnique({
            where: {
                slug,
            },
        });

        return Boolean(tag);
    } catch (error) {
        return false;
    }
};

export { existingMovieTagByName, existingMovieBySlug };
