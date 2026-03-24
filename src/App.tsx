import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RootLayout } from "@components/layout/RootLayout";
import { HomePage } from "@pages/HomePage";
import { NotFoundPage } from "@pages/NotFoundPage";
import { ContactPage } from "@pages/ContactPage";
import { StartProjectPage } from "@pages/StartProjectPage";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="start-project" element={<StartProjectPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
