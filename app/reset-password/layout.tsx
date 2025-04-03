export const generateMetadata = () => {
  return {
    title: `Reset Password | ${process.env.NEXT_APP_NAME}`,
    description: `Welcome to the ${process.env.NEXT_APP_NAME}, your one-stop shop for electronics.`,
  };
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
