import { useState } from "react"
import FormField from "../components/FormField"


const FormEdition = () => {
  const [tags, setTags] = useState(["strange", "tags"])

  const inputTags = (e) => {
    if (e.key === " " || e.key === "Enter") {
      setTags([...tags, e.target.value])
      e.target.value = ""
    }
  }

  return (
    <div>
      <FormField 
        type="text"
        name="title"
        required
      />
      <div>
        {
          tags && tags.map((tag, index) => (
            <button key={index}>{tag}</button>
          ))
        }
      </div>
      <input 
        type="text"
        name="tags"
        placeholder="type a tag followed by the space key"
        required
        onKeyUp={inputTags}
      />
      <textarea
        name="description"
        placeholder="Description"
        cols="30"
        rows="10"
        required
      >
      </textarea>
      <textarea
        name="description"
        placeholder="Description"
        cols="30"
        rows="10"
        required
      >
      </textarea>
    </div>
  )
}

export default FormEdition