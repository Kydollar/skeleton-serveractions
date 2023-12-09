import {
    existingMovieBySlug,
    existingMovieTagByName,
} from '@/app/_actions/movies/utils';

import { getDelay } from '../hooks/usePromise';

const titleMovieRefinement = async ({ title }: { title: string }) => {
    if (!title) return true;

    const delay = await getDelay(300);
    const response = delay && (await existingMovieBySlug(title));
    return !response;
};

const nameTagMovieRefinement = async ({ name }: { name: string }) => {
    if (!name) return true;

    const delay = await getDelay(300);
    const response = delay && (await existingMovieTagByName(name));
    return !response;
};

export { titleMovieRefinement, nameTagMovieRefinement };
