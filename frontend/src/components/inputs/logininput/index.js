import "./style.css";
//useField is a custom hook that helps with form management
import { ErrorMessage, useField } from "formik";
import { useMediaQuery } from "react-responsive";

//the LoginInput component is used to render the input fields
//...props is used to pass in the props from the parent component getting all variables
export default function LoginInput({ placeholder, bottom, ...props }) {
  //the useField hook is used to manage the state of the input fields
  const [field, meta] = useField(props);
  //the useMediaQuery hook is used to make the input fields responsive
  //it returns true if the current screen width is greater than 850px
  const desktopView = useMediaQuery({ query: "(min-width: 850px)" });
  return (
    <div className="input_wrap">
      {meta.touched && meta.error && !bottom && (
        <div
          className={desktopView ? "input_error_desktop" : "input_error"}
          style={{ transform: "translateY(4px)" }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={desktopView ? "error_arrow_left" : "error_arrow_top"}
            ></div>
          )}
        </div>
      )}
      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        name={field.name}
        placeholder={placeholder}
        //...field is used to pass in the props from the parent component getting all variables
        {...field}
        {...props}
      ></input>
      {meta.touched && meta.error && bottom && (
        <div className={desktopView ? "input_error_desktop" : "input_error"}>
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                desktopView ? "error_arrow_left" : "error_arrow_bottom"
              }
            ></div>
          )}
        </div>
      )}
      {meta.touched && meta.error && (
        <i
          className="error_icon"
          style={{ top: `${!bottom && !desktopView && "63%"}` }}
        >
          {" "}
        </i>
      )}
    </div>
  );
}
