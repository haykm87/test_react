import {FC, useEffect, useId} from 'react'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {styled} from '@mui/material/styles';
import useAutocomplete, {AutocompleteGetTagProps} from '@mui/base/useAutocomplete';
import {Label, InputWrapper, Root, Listbox} from './style'

interface IProps {
    data: DataOptionType[],
    label?: string,
    onChange?: (value: DataOptionType[]) => void
}

interface DataOptionType {
    name: string;
    id: number | string;
}

export const CustomSelect: FC<IProps> = ({data = [], label = [], onChange}): JSX.Element => {
    const id = useId()
    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value,
        focused,
        setAnchorEl,
    } = useAutocomplete({
        id,
        defaultValue: [data[1]],
        multiple: true,
        options: data,
        getOptionLabel: (option) => option.name,
    });

    useEffect(() => {
        onChange && onChange(value)
    }, [value])

    return (
        <Root>
            <div {...getRootProps()}>
                <Label {...getInputLabelProps()}>{label}</Label>
                <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}

                >
                    {value.map((option: DataOptionType, index: number) => (
                        <StyledTag label={option.name} {...getTagProps({index})} />
                    ))}
                    <input {...getInputProps()} />
                </InputWrapper>
            </div>
            {groupedOptions.length > 0 ? (
                <Listbox {...getListboxProps()}>
                    {(groupedOptions as typeof data).map((option, index) => (
                        <li {...getOptionProps({option, index})}>
                            <span>{option.name}</span>
                            <CheckIcon fontSize="small"/>
                        </li>
                    ))}
                </Listbox>
            ) : null}
        </Root>
    )
}

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
    label: string;
}

function Tag(props: TagProps) {
    const {label, onDelete, ...other} = props;
    return (
        <div {...other}>
            <span>{label}</span>
            <CloseIcon onClick={onDelete}/>
        </div>
    );
}

export const StyledTag = styled(Tag)<TagProps>(
    ({theme}) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'
    };
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`,
);





