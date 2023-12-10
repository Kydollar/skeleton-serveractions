import { Suspense } from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { getMoviesAction } from '../_actions/movies';
import MoviesCard from './_components/movie-card';
import MovieCardSkeleton from './_components/movie-card-skeleton';
import MovieSearch from './_components/movie-search';
import Await from './await';

const Page = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    const page =
        typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
    const limit =
        typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 9;

    const search =
        typeof searchParams.search === 'string'
            ? searchParams.search
            : undefined;

    const promise = getMoviesAction({ page, limit, search });

    return (
        <section className="py-24" key={Math.random()}>
            <div className="container">
                <div className="mb-12 flex items-center justify-between gap-x-16">
                    <h1 className="text-3xl font-bold">Movies</h1>

                    <div className="grow">
                        <MovieSearch search={search} />
                    </div>

                    <div className="flex space-x-6">
                        <Link
                            href={{
                                pathname: '/movies',
                                query: {
                                    ...(search ? { search } : {}),
                                    page: page > 1 ? page - 1 : 1,
                                },
                            }}
                            className={cn(
                                'rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800',
                                page <= 1 && 'pointer-events-none opacity-50'
                            )}
                        >
                            Previous
                        </Link>
                        <Link
                            href={{
                                pathname: '/movies',
                                query: {
                                    ...(search ? { search } : {}),
                                    page: page + 1,
                                },
                            }}
                            className="rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800"
                        >
                            Next
                        </Link>
                    </div>
                </div>

                <Suspense fallback={<MovieCardSkeleton />}>
                    <Await promise={promise}>
                        {({ movies }) => <MoviesCard movies={movies} />}
                    </Await>
                </Suspense>
            </div>
        </section>
    );
};

export default Page;
