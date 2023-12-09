// movies action
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';
import slugify from 'slugify';

import { db } from '@/lib/db';
import { TMovie } from '@/lib/schemas/movieSchema';

import { sleep } from '../utils';

const createMovieAction = async ({
    title,
    description,
    releaseDate,
    imageUrl,
    published,
    category,
    tags,
}: TMovie) => {
    const slug = slugify(title, { lower: true });

    const movie = await db.movie.create({
        data: {
            title,
            slug,
            description,
            releaseDate,
            imageUrl,
            published,
            category: {
                connect: {
                    slug: category.slug,
                },
            },
            tags: {
                connectOrCreate: tags.map((item) => ({
                    where: {
                        name: item.name,
                        slug: item.slug
                            ? slugify(item.slug, { lower: true })
                            : slugify(item.name, { lower: true }),
                    },
                    create: {
                        name: item.name,
                        slug: item.slug
                            ? slugify(item.slug, { lower: true })
                            : slugify(item.name, { lower: true }),
                    },
                })),
            },
        },
    });

    revalidatePath('/');

    return movie;
};

const getMoviesAction = async ({
    search,
    page = 1,
    limit = 9,
    categoryslug,
    tagslugs = [],
    pub = 'all',
}: {
    search?: string;
    page?: number;
    limit?: number;
    categoryslug?: string;
    tagslugs?: string[];
    pub?: 'all' | 'published' | 'draft';
}) => {
    const skip = (page - 1) * limit;

    // Build Prisma where conditions
    const where: Prisma.MovieWhereInput = {
        OR: [
            {
                title: {
                    contains: search,
                    mode: 'insensitive',
                },
            },
            {
                description: {
                    contains: search,
                    mode: 'insensitive',
                },
            },
        ],
    };

    if (categoryslug) {
        where.category = {
            slug: categoryslug,
        };
    }

    if (tagslugs.length > 0) {
        where.tags = {
            some: {
                slug: {
                    in: tagslugs,
                },
            },
        };
    }

    if (pub === 'published') {
        where.published = true;
    } else if (pub === 'draft') {
        where.published = false;
    }

    // Count total movies based on the publication status and additional filters
    const totalMovies = await db.movie.count({
        where,
    });

    // Fetch movies based on the publication status and additional filters
    const movies = await db.movie.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
    });

    await sleep(1000);

    const totalPages = Math.ceil(totalMovies / limit);

    return {
        movies,
        totalPages,
    };
};

export { createMovieAction, getMoviesAction };
