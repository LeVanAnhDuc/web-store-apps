// components
import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_ROW_COUNT = 4;

const AppAccessSkeleton = () => (
  <div className="border-border bg-card rounded-xl border">
    <div className="border-border border-b p-4">
      <Skeleton className="h-5 w-32 rounded-md" />
    </div>
    <div className="divide-border divide-y">
      {Array.from({ length: SKELETON_ROW_COUNT }).map((_, i) => (
        <div key={`app-access-skeleton-${i}`} className="p-4">
          <Skeleton className="h-10 rounded-lg" />
        </div>
      ))}
    </div>
  </div>
);

export default AppAccessSkeleton;
