const ProfileCardSkeleton = () => (
  <div className="bg-card rounded-xl border p-6">
    <div className="flex flex-col items-center gap-4 pb-6">
      <div className="bg-muted size-24 animate-pulse rounded-full" />
      <div className="bg-muted h-6 w-40 animate-pulse rounded" />
    </div>
    <div className="mt-6 space-y-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-muted h-10 animate-pulse rounded-lg" />
      ))}
    </div>
  </div>
);

export default ProfileCardSkeleton;
