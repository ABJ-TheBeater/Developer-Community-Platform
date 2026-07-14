import { developers } from '@/data/developers';

const page = () => {
    const newMembers = developers.filter((developer) => developer.isNew);

  return (
    <div>
      <h1>New Members</h1>
      <ul>
        {newMembers.map((dev) => (
          <li key={dev.username}>
            <h2>{dev.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default page