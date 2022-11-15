import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { usePostUserRegister } from "../../hooks/mutation/auth/usePostUserRegister";
import { AUTH_ABSOLUTE_PATH } from "../../routes/paths";

const validationSchema = Yup.object({
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

type ValidationType = Yup.InferType<typeof validationSchema>;

const initialValues: ValidationType = {
  username: "",
  email: "",
  password: "",
};

const RegisterForm = () => {
  const { mutate, isLoading } = usePostUserRegister();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      mutate({ user: values });
    },
  });

  const usernameError = !!formik.errors.username && !!formik.touched.username;
  const emailError = !!formik.errors.email && !!formik.touched.email;
  const passwordError = !!formik.errors.password && !!formik.touched.password;

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-4">
        <Form.Label className={usernameError ? "text-danger" : ""}>
          User
        </Form.Label>
        <Form.Control
          name="username"
          type="text"
          placeholder="User"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={usernameError ? "border-danger" : ""}
        />
        {usernameError && (
          <Form.Text className="text-danger">
            {formik.errors.username}
          </Form.Text>
        )}
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label className={emailError ? "text-danger" : ""}>
          Email
        </Form.Label>
        <Form.Control
          name="email"
          type="email"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={emailError ? "border-danger" : ""}
        />
        {emailError && (
          <Form.Text className="text-danger">{formik.errors.email}</Form.Text>
        )}
      </Form.Group>
      <Form.Group className="mb-5">
        <Form.Label className={passwordError ? "text-danger" : ""}>
          Password
        </Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={passwordError ? "border-danger" : ""}
        />
        {passwordError && (
          <Form.Text className="text-danger">
            {formik.errors.password}
          </Form.Text>
        )}
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={isLoading}
        className="w-100"
      >
        {isLoading ? "Loading..." : "Register"}
      </Button>
      <p className="p-0 m-0 mt-2">
        Already Registered?
        <Link
          to={AUTH_ABSOLUTE_PATH.LOGIN}
          className="p-0 m-0 px-3 auth_links text-decoration-none text-dark"
        >
          Login
        </Link>
      </p>
    </Form>
  );
};
export default RegisterForm;
