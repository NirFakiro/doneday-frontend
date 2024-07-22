import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

export function GroupPersonFilter({ setFilterBy }) {
  const { boardId } = useParams()
  const currBoard = useSelector((storeState) =>
    storeState.boardModule.boards.find((board) => board._id === boardId)
  )
  const groups = currBoard.groups || []
  const tasks = groups.flatMap((group) => group.tasks || [])
  const memberIds = tasks.flatMap((task) => task.memberIds)
  console.log(tasks)

  const userAvatar = tasks.flatMap((task) => task.img)

  function getMember(memberId) {
    const filteredGroups = groups.map((group) => {
      const filteredTasks = group.tasks.filter(
        (task) =>
          (Array.isArray(task.byMember) && task.byMember.includes(memberId)) ||
          (Array.isArray(task.memberIds) && task.memberIds.includes(memberId))
      )
      return {
        ...group,
        tasks: filteredTasks,
      }
    })
    const nonEmptyGroups = filteredGroups.filter(
      (group) => group.tasks.length > 0
    )

    setFilterBy(nonEmptyGroups)
    console.log({ nonEmptyGroups })
    return nonEmptyGroups
  }

  return (
    <section className="person-modal">
      <p>Filter this board by person</p>
      <p>And find items they're working on.</p>
      <div className="members">
        {[...new Set(memberIds)].map((memberId, index) => (
          <div
            className="member"
            key={index}
            onClick={() => getMember(memberId)}
          >
            {memberId}
          </div>
        ))}
      </div>
    </section>
  )
}
