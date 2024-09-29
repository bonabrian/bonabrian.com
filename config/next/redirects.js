const redirect = (source, destination, permanent = true) => {
  return { source, destination, permanent };
};

module.exports = [
  redirect('/feed', '/feed.xml'),
  redirect('/resume/download', '/share/resume.pdf'),
];
