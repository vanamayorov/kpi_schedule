import ContentLoader from "react-content-loader";

const TableLoader = () => (
  <ContentLoader
    speed={2}
    width={1280}
    height={500}
    viewBox="0 0 1280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="6" y="37" rx="0" ry="0" width="58" height="200" />
    <rect x="71" y="37" rx="0" ry="0" width="150" height="200" />
    <rect x="231" y="37" rx="0" ry="0" width="250" height="200" />
    <rect x="490" y="37" rx="0" ry="0" width="250" height="200" />
    <rect x="750" y="37" rx="0" ry="0" width="250" height="200" />
    <rect x="1011" y="37" rx="0" ry="0" width="150" height="200" />
    <rect x="1171" y="37" rx="0" ry="0" width="150" height="200" />
  </ContentLoader>
);

export default TableLoader;
