import Footer from './components/Footer';

export default {
  logo: <span>📚 책 정리</span>,
  project: {
    link: "https://github.com/shuding/nextra",
  },
  head:(
    <><title>책 정리 문서</title></>
  ),
  footer: {
    component: <>
    <Footer />
    </>
  }
};