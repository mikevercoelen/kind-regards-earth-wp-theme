import React from 'react'
import Content from 'components/Content/Content'
import styles from './Filters.scss'

const Filters = () => (
  <div className={styles.component}>
    <Content className={styles.content}>
      <div className={styles.filtersPrimary}>
        <div className={styles.filter}>
          <div className={styles.filterLabel}>
            Filter by:
          </div>
          <div className={styles.filterValue}>
            All
          </div>
        </div>
        <div className={styles.filter}>
          <div className={styles.filterLabel}>
            Country:
          </div>
          <div className={styles.filterValue}>
            All
          </div>
        </div>
      </div>
      <div className={styles.filtersSecondary}>
        <div className={styles.filter}>
          <div className={styles.filterLabel}>
            Sort by:
          </div>
          <div className={styles.filterValue}>
            Most recent
          </div>
        </div>
      </div>
    </Content>
  </div>
)

export default Filters
