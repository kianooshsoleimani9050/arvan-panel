import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { usePostUserLogin } from "../../hooks/mutation/auth/usePostUserLogin";
import { AUTH_ABSOLUTE_PATH } from "../../routes/paths";

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

type ValidationType = Yup.InferType<typeof validationSchema>;

const initialValues: ValidationType = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const { mutate, isLoading } = usePostUserLogin();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      mutate({ user: values });
    },
  });

  const emailError = !!formik.errors.email && !!formik.touched.email;
  const passwordError = !!formik.errors.password && !!formik.touched.password;

  return (
    <Form onSubmit={formik.handleSubmit}>
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
        {isLoading ? "Loading..." : "Login"}
      </Button>
      <p className="p-0 m-0 mt-2">
        Don’t have account?
        <Link
          to={AUTH_ABSOLUTE_PATH.REGISTER}
          className="p-0 m-0 px-3 auth_links text-decoration-none text-dark"
        >
          Register Now
        </Link>
      </p>
    </Form>
  );
};
export default LoginForm;
