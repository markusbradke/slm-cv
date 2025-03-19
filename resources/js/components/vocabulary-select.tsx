import Select from 'react-select';

type VocabularySelectProps = {
    value: string | null;
    onChange: (value: string | null) => void;
    vocabularies: { id: string; name: string }[];
    placeholder?: string;
    className?: string;
};

export default function VocabularySelect({ value, onChange, vocabularies, placeholder, className }: VocabularySelectProps) {
    const options = vocabularies.map((vocab) => ({
        value: vocab.id,
        label: vocab.name,
    }));

    return (
        <Select
            value={options.find((option) => option.value === value) || null}
            onChange={(selected) => onChange(selected ? selected.value : null)}
            options={options}
            isClearable
            placeholder={placeholder}
            className={className}
            styles={{
                control: (base, state) => ({
                    ...base,
                    backgroundColor: 'var(--background)', // Adjust to theme
                    borderColor: state.isFocused ? 'var(--primary)' : 'var(--border)',
                    color: 'var(--text)', // Text color inside the select box
                    '&:hover': {
                        borderColor: 'var(--primary-hover)',
                    },
                }),
                menu: (base) => ({
                    ...base,
                    backgroundColor: 'var(--background)', // Menu background color
                    borderColor: 'var(--border)',
                }),
                option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isSelected
                        ? 'var(--primary)' // Selected background color
                        : state.isFocused
                          ? 'var(--primary-light)' // Focused background color
                          : 'var(--background)', // Normal background color
                    color: state.isSelected
                        ? 'var(--text-on-primary)' // Text color for selected option
                        : state.isFocused
                          ? 'var(--text)' // Text color when focused
                          : 'var(--text)', // Default text color
                    '&:hover': {
                        backgroundColor: 'var(--primary-hover)',
                        color: 'var(--text-on-primary)',
                    },
                }),
                singleValue: (base) => ({
                    ...base,
                    color: 'var(--text)', // Color for selected value in control
                }),
            }}
        />
    );
}
