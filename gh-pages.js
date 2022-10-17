var ghpages = require('gh-pages');

ghpages.publish(
    'dist', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/MetallicDragon/prun-tool.git',
        user: {
            name: 'James Bowden',
            email: 'james.b.bowden@gmail.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)