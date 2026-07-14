import {developers} from "@/data/developers";

const page = () => {
    const topRatedDevelopers = developers.filter((dev) => dev.rating >= 4.5);
  return (
    <div>
      <h1>Top Rated Developers</h1>
      <ul>
        {topRatedDevelopers.map((dev) => (
          <li key={dev.username}>
            <h2>{dev.name}</h2>
            <p>Rating: {dev.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default page