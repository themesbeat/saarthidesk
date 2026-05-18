import Pusher from "pusher";

let pusherInstance: Pusher | null = null;

if (
  process.env.PUSHER_APP_ID &&
  process.env.PUSHER_KEY &&
  process.env.PUSHER_SECRET &&
  process.env.PUSHER_CLUSTER
) {
  try {
    pusherInstance = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_KEY,
      secret: process.env.PUSHER_SECRET,
      cluster: process.env.PUSHER_CLUSTER,
      useTLS: true,
    });
  } catch (err) {
    console.error("[Pusher] Failed to initialize Pusher instance:", err);
  }
}

export async function triggerRealtimeEvent(
  workspaceId: string,
  channel: string,
  event: string,
  data: any
) {
  console.log(`[Realtime Broadcast] Workspace: ${workspaceId} | Channel: ${channel} | Event: ${event}`, data);

  if (pusherInstance) {
    try {
      await pusherInstance.trigger(`${workspaceId}-${channel}`, event, data);
    } catch (err) {
      console.error("[Pusher] Trigger error:", err);
    }
  }
}
