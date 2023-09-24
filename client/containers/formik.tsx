import { useFormik } from 'formik';

const MyForm = ({ defaultValues, onSubmit }) => {
  const fields = [
    { name: 'field1', type: 'text', label: 'Field 1' },
    { name: 'field2', type: 'number', label: 'Field 2' },
    // ... add more fields as needed
  ];

  const formik = useFormik({
    initialValues: defaultValues,
    onSubmit: values => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {fields.map(field => (
        <div key={field.name}>
          <label>{field.label}</label>
          <input 
            type={field.type} 
            name={field.name}
            onChange={formik.handleChange}
            value={formik.values[field.name]}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};
