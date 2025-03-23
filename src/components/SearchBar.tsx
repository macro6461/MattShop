import { useState, useRef } from 'react'
import { View } from 'react-native'
import { TextInput } from '@react-native-material/core'

interface SearchBarProps {
  onFilter: (e: any) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onFilter }) => {
  const [text, setText] = useState<string>('')
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const debounceSearch = (value: string) => {
    setText(value)

    // Clear previous timeout if any
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      onFilter(value)
    }, 1000) // Delay of 1 second
  }

  return (
    <View>
      <TextInput
        onChangeText={debounceSearch}
        value={text}
        label="Search"
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  )
}

export default SearchBar
