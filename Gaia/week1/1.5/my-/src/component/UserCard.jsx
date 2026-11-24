function UserCard({ name, email, role }) {
    return (
        <div>
            <h1>{name}</h1>
            <p>{email}</p>
            <p>{role}</p>
        </div>
    );
}

export default UserCard;

// Receiving props
// function UserCard(props) {
//     return (
//         <div className="user-card">
//             <h2>{props.name}</h2>
//             <p>{props.email}</p>
//             <span>{props.role}</span>
//         </div>
//     )
// }
// export default UserCard
//  // Using destructuring (Industry Standard)
//  function UserCard(props) {
//     return (
//         <div className="user-card">
//             <h2>{name}</h2>
//             <p>{email}</p>
//             <span>{role}</span>
//         </div>
//     )
// }