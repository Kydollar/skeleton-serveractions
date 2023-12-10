import Image from 'next/image';
import { Movie } from '@prisma/client';

export default function MovieCard({ movies }: { movies: Movie[] }) {
    console.log(movies);
    return (
        <ul
            role="list"
            className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8"
        >
            {movies?.map((movie) => (
                <li key={movie.id} className="relative">
                    <div className="group block aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                        <Image
                            src={movie.imageUrl || ''}
                            alt=""
                            className="object-cover group-hover:opacity-75"
                            width={300}
                            height={300}
                        />
                    </div>
                    <p className="mt-2 block truncate font-medium">
                        {movie.title}
                    </p>
                    <p className="block text-sm font-medium text-gray-500">
                        {movie.description}
                    </p>
                    <p className="block text-sm font-medium text-gray-500">
                        {!!movie.releaseDate}
                    </p>
                </li>
            ))}
        </ul>
    );
}
