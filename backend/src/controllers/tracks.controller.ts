import { OK } from "../constants/http.js"
import { getTrackParamsSchema } from "../schema/tracks.schema.js"
import { getTrackService } from "../services/tracks.service.js"
import catchErrors from "../utils/catchErrors.js"

export const getTrackController = catchErrors(async (req, res) => {
  const { trackId } = getTrackParamsSchema.parse(req.params)

  const track = await getTrackService(trackId)

  return res.status(OK).json(track)
})
