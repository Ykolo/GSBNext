const FormInscription = () => {
  return (
    <form>
      <label htmlFor="nom">Nom</label>
      <input type="text" id="nom" name="nom" />
      <label htmlFor="prenom">Prénom</label>
      <input type="text" id="prenom" name="prenom" />
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" />
      <label htmlFor="password">Mot de passe</label>
      <input type="password" id="password" name="password" />
      <button type="submit">Inscription</button>
    </form>
  );
};
export default FormInscription;
