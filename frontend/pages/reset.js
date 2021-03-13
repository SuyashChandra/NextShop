import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  console.log(query);
  if (!query?.token) {
    return (
      <div>
        <p>You must supply a token</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>Reset Your Password: {query.token}</p>
      <Reset token={query.token} />
    </div>
  );
}
