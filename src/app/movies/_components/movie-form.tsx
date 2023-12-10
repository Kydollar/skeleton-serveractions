'use client';

import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import makeAnimated from 'react-select/animated';
import { toast } from 'sonner';

import {
    movieFormSchema,
    TCategory,
    TMovie,
    TMovieForm,
    TTag,
} from '@/lib/schemas/movieSchema';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SelectComponent } from '@/components/ui/react-select';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import Spinner from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Icons } from '@/components/shared/icons';
import { createMovieAction } from '@/app/_actions/movies';

const defaultValues: Partial<TMovieForm> = {
    title: '',
    slug: '',
    description:
        'Lorem ipsum dolor sit amet . The graphic and typographic operators know this well, in reality all the professions dealing with the universe of communication have a stable relationship with these words, but what is it? Lorem ipsum is a dummy text without any sense.',
    releaseDate: new Date(),
    imageUrl: '',
    // relations
    category: '',
    tags: [],

    // Boolean
    published: false,
};

const animatedComponents = makeAnimated();

export default function MovieForm({
    tags: tagsValue,
    categories: categoriesValue,
}: {
    tags: TTag[];
    categories: TCategory[];
}) {
    const form = useForm<TMovieForm>({
        mode: 'all',
        resolver: zodResolver(movieFormSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = form;

    console.log(errors);

    // const router = useRouter();

    const [expandSizeForm, setExpandSizeForm] = useState<boolean>(false);

    const onSubmit = async (values: TMovieForm) => {
        const transformedValues = {
            category: { slug: values.category },
            tags: values.tags.map((tagName) => ({
                name: tagName,
            })),
        };

        const newValues = {
            ...values,
            ...transformedValues,
        } as TMovie;

        await createMovieAction(newValues);

        toast.success('message', {
            description: 'The new article has been posted successfully.',
        });

        // router.push('/movies');
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap gap-4 overflow-x-hidden">
                    <div className="md:w-[calc(33.333333%-10px)]">
                        <h1 className="font-semibold">Details</h1>
                        <p className="text-sm text-muted-foreground">
                            Title, short description, image URL...
                        </p>
                    </div>
                    <div
                        className={cn(
                            'relative ml-auto flex flex-col transition-all duration-1000',
                            !expandSizeForm
                                ? 'md:w-[calc(66.666667%-10px)]'
                                : 'md:w-[calc(100%-24px)]'
                        )}
                    >
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    type="button"
                                    className="absolute hidden h-full -translate-x-6 items-center justify-center rounded-l-lg border bg-muted-foreground/5 text-card-foreground shadow-sm transition-colors duration-300 hover:bg-muted-foreground/10 dark:bg-muted-foreground/20 md:flex"
                                    onClick={() =>
                                        setExpandSizeForm(!expandSizeForm)
                                    }
                                >
                                    {expandSizeForm ? (
                                        <Icons.chevronRight className="h-4 w-4" />
                                    ) : (
                                        <Icons.chevronLeft className="h-4 w-4" />
                                    )}
                                </button>
                            </TooltipTrigger>
                            <TooltipContent align="start">
                                {expandSizeForm ? (
                                    <>Reduce the form</>
                                ) : (
                                    <>Expand the size of the form</>
                                )}
                            </TooltipContent>
                        </Tooltip>
                        <Card>
                            <CardContent className="space-y-4 pt-4">
                                <FormField
                                    control={control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {categoriesValue.map(
                                                                (
                                                                    category,
                                                                    index
                                                                ) => (
                                                                    <SelectItem
                                                                        value={
                                                                            category.slug
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {
                                                                            category.name
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Title"
                                                    className="bg-background/50"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Description"
                                                    className="resize-none bg-background/50"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Image URL</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Image URL"
                                                    className="bg-background/50"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-4 md:flex-row">
                    <div className="md:w-1/3">
                        <h1 className="font-semibold">Properties</h1>
                        <p className="text-sm text-muted-foreground">
                            Additional functions and attributes...
                        </p>
                    </div>
                    <div className="flex flex-col md:w-2/3">
                        <Card>
                            <CardContent className="space-y-4 pt-4">
                                <FormField
                                    control={control}
                                    name="tags"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tags</FormLabel>
                                            <FormControl>
                                                <SelectComponent
                                                    id="select-tags"
                                                    instanceId="select-tags"
                                                    options={tagsValue.map(
                                                        (tag) => ({
                                                            value: tag.slug,
                                                            label: tag.name,
                                                        })
                                                    )}
                                                    onChange={(
                                                        selectedOptions
                                                    ) => {
                                                        field.onChange(
                                                            selectedOptions.map(
                                                                (option: any) =>
                                                                    option.label
                                                            )
                                                        );
                                                    }}
                                                    components={
                                                        animatedComponents
                                                    }
                                                    placeholder="Select a tags..."
                                                    createAble
                                                    isMulti
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="published"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row-reverse items-center justify-center gap-2 pl-0.5 pt-2">
                                            <FormLabel className="mr-auto">
                                                Publish
                                            </FormLabel>
                                            <FormControl className="!my-0">
                                                <Switch
                                                    checked={
                                                        field.value
                                                            ? true
                                                            : false
                                                    }
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                >
                                                    <span className="sr-only">
                                                        Toggle published
                                                    </span>
                                                </Switch>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end">
                    {isSubmitting ? (
                        <Button disabled>
                            <Spinner />
                        </Button>
                    ) : (
                        <Button type="submit">Create Movie</Button>
                    )}
                </div>
            </form>
        </Form>
    );
}
