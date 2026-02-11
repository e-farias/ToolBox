import Select from 'react-select'

interface Props {
  options: any[]
  handleSetValue: (value: any) => void
  hexColor: string
}

const SelectSync = ({
  options,
  handleSetValue,
  hexColor,
} : Props) => {
  return (
    <Select
      aria-label="text"
      onChange={(option) => {
        if (option) {
          handleSetValue(option.value)
        }
      }}
      defaultValue={undefined}
      options={options}
      placeholder="Selecione"
      className="z-[60] mt-1"
      styles={{
        indicatorsContainer: (base) => ({
          ...base,
          cursor: 'pointer'
        }),
        input: (base) => ({
          ...base,
          minHeight: '38px',
          cursor: 'pointer'
        }),
        option: (base) => ({
          ...base,
          cursor: 'pointer',
          margin: '4px 0',
          borderRadius: 4
        }),
        menu: (base) => ({
          ...base,
          paddingLeft: '8px',
          paddingRight: '8px'
        })
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: hexColor,
          primary25: `${hexColor}80`,
          primary50: `${hexColor}12`
        }
      })}
    />
  )
}

export default SelectSync