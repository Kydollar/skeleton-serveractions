import { getCategoriesAction, getTagsAction } from '@/app/_actions/movies';

import MoviesForm from '../_components/movie-form';

export default async function page() {
    const tags = await getTagsAction();
    const categories = await getCategoriesAction();

    return <MoviesForm tags={tags} categories={categories} />;
}
