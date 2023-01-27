import { motion } from 'framer-motion'

import { EndorsementsCard, GitHubCard, ViewsCard } from '@/components/Metrics'
import { PageSeo } from '@/components/PageSeo'
import PageTitle from '@/components/PageTitle'

const Stats = () => {
  return (
    <>
      <PageSeo
        title="Stats"
        description="Statistics about my digital home, Github, and more"
        keywords={['statistics', 'stats', 'dashboard', 'github']}
      />
      <div className="pt-6 pb-8 space-y-3 md:space-y-5">
        <PageTitle>Stats</PageTitle>
      </div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="grid w-full grid-cols-1 gap-4 my-2 mt-4 sm:grid-cols-2"
      >
        <ViewsCard />
        <EndorsementsCard />
        <GitHubCard />
      </motion.div>
    </>
  )
}

export default Stats
