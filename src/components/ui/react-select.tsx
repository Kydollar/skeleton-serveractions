'use client';

import React from 'react';
import Select, { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { cn } from '@/lib/utils';

import { Icons } from '../shared/icons';

import type {
    ClearIndicatorProps,
    DropdownIndicatorProps,
    GroupBase,
    MultiValueRemoveProps,
    Props as SelectProps,
} from 'react-select';

const DropdownIndicator = <
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
>(
    props: DropdownIndicatorProps<Option, IsMulti, Group>
) => (
    <components.DropdownIndicator {...props}>
        <Icons.chevronDown />
    </components.DropdownIndicator>
);

const ClearIndicator = <
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
>(
    props: ClearIndicatorProps<Option, IsMulti, Group>
) => (
    <components.ClearIndicator {...props}>
        <Icons.close />
    </components.ClearIndicator>
);

const MultiValueRemove = (props: MultiValueRemoveProps) => (
    <components.MultiValueRemove {...props}>
        <Icons.close />
    </components.MultiValueRemove>
);

const controlStyles = {
    base: '!cursor-text flex w-full rounded-md border border-input bg-background/50 px-2 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground',
    focus: 'outline-none ring-1 ring-ring',
    nonFocus: 'border-border',
};
const placeholderStyles = 'text-muted-foreground text-sm ml-1';
const selectInputStyles = 'text-foreground text-sm ml-1';
const valueContainerStyles = 'text-foreground text-sm';
const singleValueStyles = 'ml-1';
const multiValueStyles =
    'ml-1 bg-background/50 border border-border rounded-sm items-center px-1 my-0.5 gap-1.5';
const multiValueLabelStyles = 'leading-5 text-xs py-0.5';
const multiValueRemoveStyles =
    'bg-accent hover:bg-accent/50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md cursor-pointer';
const indicatorsContainerStyles = 'gap-1 bg-background/50 rounded-lg';
const clearIndicatorStyles =
    'text-gray-500 rounded-md hover:text-red-800 cursor-pointer';
const indicatorSeparatorStyles = 'bg-muted';
const dropdownIndicatorStyles =
    'hover:text-foreground text-gray-500 cursor-pointer';
const menuStyles =
    'mt-1 p-2 border border-border bg-background/50 backdrop-blur-md text-sm rounded-lg';
const optionsStyle =
    'bg-transparent px-2 py-1.5 border-0 rounded-sm text-base hover:bg-accent hover:text-accent-foreground hover:cursor-pointer';
const groupHeadingStyles =
    'ml-3 mt-2 mb-1 text-gray-500 text-sm bg-background/50';
const noOptionsMessageStyles = 'text-muted-foreground bg-background/50';

function SelectComponentInner<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
>(
    {
        options,
        value,
        onChange,
        isMulti,
        isDisabled,
        components,
        createAble,
        isLoading,
        placeholder,
        defaultValue,
        ...props
    }: SelectProps<Option, IsMulti, Group> & { createAble: boolean },
    ref: React.ForwardedRef<
        React.ElementRef<typeof Select<Option, IsMulti, Group>>
    >
) {
    const Comp = createAble ? CreatableSelect : Select;
    return (
        <Comp
            ref={ref}
            unstyled
            isClearable
            isSearchable
            value={value}
            isDisabled={isDisabled}
            isMulti={isMulti}
            isLoading={isLoading}
            placeholder={placeholder}
            components={{
                DropdownIndicator,
                ClearIndicator,
                MultiValueRemove,
                ...components,
            }}
            defaultValue={value}
            options={options}
            noOptionsMessage={() => 'No options found !!'}
            onChange={onChange}
            classNames={{
                control: ({ isFocused, isDisabled }) =>
                    cn(
                        isDisabled ? 'cursor-not-allowed opacity-50' : '',
                        isFocused
                            ? controlStyles.focus
                            : controlStyles.nonFocus,
                        controlStyles.base
                    ),
                placeholder: () => placeholderStyles,
                input: () => selectInputStyles,
                option: () => optionsStyle,
                menu: () => menuStyles,
                valueContainer: () => valueContainerStyles,
                singleValue: () => singleValueStyles,
                multiValue: () => multiValueStyles,
                multiValueLabel: () => multiValueLabelStyles,
                multiValueRemove: () => multiValueRemoveStyles,
                indicatorsContainer: () => indicatorsContainerStyles,
                clearIndicator: () => clearIndicatorStyles,
                indicatorSeparator: () => indicatorSeparatorStyles,
                dropdownIndicator: () => dropdownIndicatorStyles,
                groupHeading: () => groupHeadingStyles,
                noOptionsMessage: () => noOptionsMessageStyles,
            }}
            {...props}
        />
    );
}

export const SelectComponent = React.forwardRef(SelectComponentInner) as <
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>,
>(
    props: SelectProps<Option, IsMulti, Group> & {
        createAble: boolean;
        ref?: React.ForwardedRef<
            React.ElementRef<typeof Select<Option, IsMulti, Group>>
        >;
    }
) => ReturnType<typeof SelectComponentInner>;
