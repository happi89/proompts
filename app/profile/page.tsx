import Feed from "@/components/Feed";

const Profile = async () => {
  const prompts = await fetch(`${ process.env.URL }/api/users/prompts`, {
    cache: 'no-store',
  }).then(res => res.json())

  return (
    <section className="flex-col w-full px-8 mt-8 md:mt-16 flex-center">
      <h1 className="w-full text-4xl font-bold text-left blue_gradient">
        My Profile
      </h1>
      <Feed p={prompts} />
    </section>
  );
};

export default Profile;
