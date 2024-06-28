import React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const HighchartsComponent = ({ data }) => {

  const parseData = (items) => items.map(item => {
    const date = new Date(item?.commit?.committer?.date).toLocaleDateString();
    const changes = item?.stats ? item?.stats?.total : 1;
    const authorr = item?.commit?.author?.name;
    const authorAvatar = item?.author?.avatar_url;
    const commitUrl = item?.html_url;
    const namee = item?.commit?.message;
    const authorHtmlUrl = item?.author?.html_url;
    const committerName = item?.commit?.committer?.name;
    const committerAvatar = item?.committer?.avatar_url;
    const committerHtmlUrl = item?.committer?.html_url;
    
    const tooltipp = `
      <img src="${authorAvatar}" alt="avatar" width="30" height="30" style="border-radius: 50%;"><br/>
      <b>${authorr}</b><br/>
      <b>Commit:</b> <a href="${commitUrl}">${namee}</a><br/>
      <b>Date:</b> ${date}<br/>
      <b>Changes:</b> ${changes}<br/>
      <b>Committer:</b> ${committerName}<br/>
      <b>Author Profile:</b> <a href="${authorHtmlUrl}">GitHub</a><br/>
      <b>Committer Profile:</b> <a href="${committerHtmlUrl}">GitHub</a>`;

    return {
      x: new Date(item?.commit?.committer?.date).getTime(),
      y: changes,
      name: namee,
      author: authorr,
      tooltip: tooltipp,
    };
  });

  const options = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Commit Activity',
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Date',
      },
    },
    yAxis: {
      title: {
        text: 'Number of Changes',
      },
    },
    series: [
      {
        name: 'Commits',
        data: parseData(data),
      },
    ],
    tooltip: {
      useHTML: true,
      pointFormat: '{point.tooltip}',
      className: 'custom-tooltip'
    },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default HighchartsComponent;

HighchartsComponent.propTypes = {
  data: PropTypes.array.isRequired
};
